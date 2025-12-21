"use client";

import React, { useState } from "react";
import * as Icons from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge";
import { Switch } from "@/app/components/ui/switch";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    subscribe: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      title: "Customer Support",
      description: "Get help with orders, accounts, and general questions",
      icon: <Icons.Headphones className="w-6 h-6" />,
      contact: "support@example.com",
      response: "Within 24 hours",
      badge: "Popular"
    },
    {
      title: "Sales Inquiries",
      description: "Questions about pricing, partnerships, and business opportunities",
      icon: <Icons.Briefcase className="w-6 h-6" />,
      contact: "sales@example.com",
      response: "Within 2 business days"
    },
    {
      title: "Technical Support",
      description: "Technical issues, bug reports, and API questions",
      icon: <Icons.Wrench className="w-6 h-6" />,
      contact: "tech@example.com",
      response: "Within 48 hours"
    },
    {
      title: "Press & Media",
      description: "Media inquiries, press releases, and partnership opportunities",
      icon: <Icons.Newspaper className="w-6 h-6" />,
      contact: "press@example.com",
      response: "Within 3 business days"
    }
  ];

  const faqs = [
    {
      question: "How long does it take to get a response?",
      answer: "Our team typically responds within 24 hours for general inquiries and within 48 hours for technical issues."
    },
    {
      question: "Do you offer phone support?",
      answer: "Yes, we offer phone support for premium customers. Please contact us via email to schedule a call."
    },
    {
      question: "What information should I include in my support request?",
      answer: "Please include your order number, account email, and a detailed description of your issue for faster resolution."
    },
    {
      question: "Do you have international support?",
      answer: "Yes, we provide support in multiple languages and across all time zones."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
        subscribe: true
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4">Get in Touch</Badge>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to our team through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Methods */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle>Contact Channels</CardTitle>
                <CardDescription>Choose the best way to reach us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{method.title}</h3>
                          {method.badge && (
                            <Badge className="ml-auto">{method.badge}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Icons.Mail className="w-3 h-3" />
                          <span className="font-medium">{method.contact}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Icons.Clock className="w-3 h-3" />
                          <span>Response: {method.response}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">Other Ways to Connect</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Icons.MessageSquare className="w-4 h-4 mr-2" />
                      Live Chat
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icons.Phone className="w-4 h-4 mr-2" />
                      Schedule a Call
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icons.MapPin className="w-4 h-4 mr-2" />
                      Visit Office
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form & Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <Icons.Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                          <Icons.User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            className="pl-10"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Icons.Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Icons.Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            className="pl-10"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleChange('category', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="sales">Sales Inquiry</SelectItem>
                            <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="Enter subject"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        className="min-h-[150px]"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Please provide details about your inquiry..."
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.subscribe}
                        onCheckedChange={(checked) => handleChange('subscribe', checked)}
                      />
                      <Label htmlFor="subscribe">
                        Subscribe to our newsletter for updates and offers
                      </Label>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="min-w-[120px]"
                      >
                        {isSubmitting ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Icons.Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                      <Button type="button" variant="outline">
                        <Icons.Paperclip className="w-4 h-4 mr-2" />
                        Attach Files
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      By submitting this form, you agree to our{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                      . Fields marked with * are required.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Icons.HelpCircle className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <Card>
              <CardHeader>
                <CardTitle>Our Offices</CardTitle>
                <CardDescription>Visit us at one of our locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icons.MapPin className="w-5 h-5 text-primary" />
                      <h3 className="font-bold">Headquarters</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      123 Tech Street<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Icons.Phone className="w-4 h-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icons.Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icons.MapPin className="w-5 h-5 text-primary" />
                      <h3 className="font-bold">Europe Office</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      456 Business Avenue<br />
                      London, EC1A 1BB<br />
                      United Kingdom
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Icons.Phone className="w-4 h-4" />
                      <span>+44 20 7123 4567</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icons.Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
                <CardDescription>Stay connected on social media</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="flex-1 min-w-[120px]">
                    <Icons.Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex-1 min-w-[120px]">
                    <Icons.Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="flex-1 min-w-[120px]">
                    <Icons.Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                  <Button variant="outline" className="flex-1 min-w-[120px]">
                    <Icons.Youtube className="w-4 h-4 mr-2" />
                    YouTube
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}