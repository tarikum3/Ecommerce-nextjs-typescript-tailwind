"use server";

import { TAGS } from "@lib/const";
// import {
//   addCartItem,
//   createCart,
//   getCart,
//   removeCartItem,
//   updateCart,
// } from "@lib/services";
import {
  upsertCartItem,
  createCart,
  getCart,
  deleteCartItem,
  // updateCart,
  createCustomer,
} from "@lib/services/prismaServices";
//import { login, logout, signup } from "@lib/services";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    if (!cart?.id) {
      return "Missing Cart ID";
    }
    cartId = cart.id;
    cookies().set("cartId", cartId);
  }

  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  try {
    // await addCartItem(cartId, { variantId: selectedVariantId });
    const cartitem = await upsertCartItem(cartId, selectedVariantId);
    console.log("cartitem", cartitem);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, id: string) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    // await removeCartItem(cartId, { id });
    await deleteCartItem(id);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateCartItem(
  prevState: any,
  payload: {
    id?: string;
    productId?: string;
    quantity?: number;
  }
) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  const { id, productId, quantity } = payload;

  try {
    if (quantity === 0) {
      // await removeCartItem(cartId, { id });
      await deleteCartItem(id!);
      revalidateTag(TAGS.cart);
      return;
    }

    // await updateCart(cartId, {
    //   id: id,
    //   productId: productId,
    //   quantity,
    // });
    await upsertCartItem(cartId, productId!, quantity);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error updating item quantity";
  }
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

type RegisterState = {
  errors?: {
    email?: string[];
    password?: string[];
    firstName?: string[];
    lastName?: string[];
  };
  message?: string | null;
};
export async function register(
  prevState: RegisterState | undefined,
  formData: FormData
) {
  try {
    const validatedFields = FormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    });
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. ",
      };
    }
    await createCustomer({ ...validatedFields.data });
    // await signup({ ...validatedFields.data });
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof Error) {
      return "Something went wrong.";
    }
    throw error;
  }
}
export async function logOut() {
  try {
    await signOut();
    //logout();
  } catch (error) {
    if (error instanceof Error) {
      return "Something went wrong.";
    }
    throw error;
  }
}
