const Newsletter = () => {
  return (
    <section className="py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            Join Our World
          </h2>
          <p className="mt-4 text-lg text-primary-600">
            Subscribe to receive updates on new arrivals, exclusive offers, and
            style inspiration.
          </p>
          <form className="mt-8 sm:flex">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-3 placeholder-primary-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border border-primary-300 rounded-sm bg-primary-0 text-primary-900"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-sm sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-sm font-medium rounded-sm text-primary-0 bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
          <p className="mt-3 text-sm text-primary-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
