"use client";

import React from "react";
import * as Icons from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";

export default function PrivacyPage() {
  const policySections = [
    {
      title: "Information We Collect",
      icon: <Icons.Database className="w-5 h-5" />,
      points: [
        "Personal identification information (name, email address, phone number)",
        "Account credentials and profile information",
        "Payment and transaction information",
        "Usage data and browsing behavior",
        "Device information and IP addresses",
        "Communication preferences"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Icons.BarChart className="w-5 h-5" />,
      points: [
        "To provide and maintain our services",
        "To process your transactions and orders",
        "To communicate with you about updates and offers",
        "To improve our website and user experience",
        "To detect and prevent fraud",
        "To comply with legal obligations"
      ]
    },
    {
      title: "Data Sharing & Disclosure",
      icon: <Icons.Share2 className="w-5 h-5" />,
      points: [
        "With service providers who assist in our operations",
        "With law enforcement when required by law",
        "With third parties in connection with business transfers",
        "With your explicit consent for specific purposes",
        "In aggregated or anonymized form for analytics"
      ]
    },
    {
      title: "Your Rights & Choices",
      icon: <Icons.Shield className="w-5 h-5" />,
      points: [
        "Access and review your personal information",
        "Correct inaccurate or incomplete data",
        "Request deletion of your personal data",
        "Opt-out of marketing communications",
        "Export your data in a portable format",
        "Withdraw consent at any time"
      ]
    },
    {
      title: "Data Security",
      icon: <Icons.Lock className="w-5 h-5" />,
      points: [
        "Encryption of sensitive information",
        "Regular security assessments and audits",
        "Access controls and authentication measures",
        "Secure data storage practices",
        "Employee training on data protection",
        "Incident response procedures"
      ]
    },
    {
      title: "Cookies & Tracking",
      icon: <Icons.Cookie className="w-5 h-5" />,
      points: [
        "Essential cookies for website functionality",
        "Analytics cookies to understand usage",
        "Marketing cookies for personalized ads",
        "Third-party tracking for services integration",
        "Cookie preferences management",
        "Do-Not-Track browser signals"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4">Privacy Policy</Badge>
          <h1 className="text-4xl font-bold mb-4">Your Privacy Matters</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We are committed to protecting your personal information and being transparent about our data practices.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <Icons.Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm">Last updated: January 15, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">Reading time: 8 minutes</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Policy Overview */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle>Our Privacy Commitment</CardTitle>
              <CardDescription>
                Understanding how we handle your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <Icons.EyeOff className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    We clearly explain what data we collect and why
                  </p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Icons.ShieldCheck className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is protected with industry-standard measures
                  </p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Icons.Settings className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Control</h3>
                  <p className="text-sm text-muted-foreground">
                    You have choices about how your data is used
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {policySections.map((section, index) => (
              <Card key={index} className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {section.icon}
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <Icons.CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cookie Preferences */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.Cookie className="w-5 h-5" />
                Cookie Preferences
              </CardTitle>
              <CardDescription>
                Manage your cookie settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icons.CheckCircle className="w-5 h-5 text-primary" />
                  <div>
                    <Label className="font-medium">Essential Cookies</Label>
                    <p className="text-sm text-muted-foreground">Required for website functionality</p>
                  </div>
                </div>
                <Switch checked disabled />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icons.BarChart className="w-5 h-5 text-primary" />
                  <div>
                    <Label className="font-medium">Analytics Cookies</Label>
                    <p className="text-sm text-muted-foreground">Help us improve our services</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icons.Megaphone className="w-5 h-5 text-primary" />
                  <div>
                    <Label className="font-medium">Marketing Cookies</Label>
                    <p className="text-sm text-muted-foreground">Personalized ads and offers</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Contact & Rights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Our Privacy Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icons.Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">privacy@example.com</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Icons.Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">Within 48 hours</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Icons.FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Data Requests</p>
                      <p className="text-sm text-muted-foreground">Processed within 30 days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exercise Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  To exercise your data protection rights, please contact us with your request.
                  We will respond in accordance with applicable laws.
                </p>
                <div className="space-y-3">
                  <Badge variant="secondary" className="w-full justify-start">
                    <Icons.Download className="w-4 h-4 mr-2" />
                    Request Data Export
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-start">
                    <Icons.Trash2 className="w-4 h-4 mr-2" />
                    Request Data Deletion
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-start">
                    <Icons.Eye className="w-4 h-4 mr-2" />
                    Access Personal Data
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="mt-12 p-6 border rounded-xl bg-muted/30 text-center">
            <Icons.Info className="w-6 h-6 mx-auto mb-3 text-primary" />
            <p className="text-sm text-muted-foreground">
              This privacy policy may be updated periodically. We will notify you of any material changes 
              by posting the new policy on this page and updating the "last updated" date.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}