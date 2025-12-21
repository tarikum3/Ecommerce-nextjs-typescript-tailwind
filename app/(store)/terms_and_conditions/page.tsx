"use client";

import React from "react";
import * as Icons from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using our services, you shall be subject to any posted guidelines or rules applicable to such services.`,
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily access the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      
      • Modify or copy the materials
      • Use the materials for any commercial purpose
      • Attempt to decompile or reverse engineer any software
      • Remove any copyright or other proprietary notations
      • Transfer the materials to another person or "mirror" the materials`,
    },
    {
      title: "3. User Account",
      content: `If you create an account with us, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.`,
    },
    {
      title: "4. Intellectual Property",
      content: `The materials contained in this website are protected by applicable copyright and trademark law. All trademarks, service marks, trade names, trade dress, product names and logos appearing on the site are the property of their respective owners.`,
    },
    {
      title: "5. Limitations",
      content: `In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.`,
    },
    {
      title: "6. Revisions",
      content: `The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current. We may make changes to the materials contained on its website at any time without notice.`,
    },
    {
      title: "7. Governing Law",
      content: `These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where our company is headquartered, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`,
    },
    {
      title: "8. Contact Information",
      content: `If you have any questions about these Terms, please contact us at legal@example.com or through our contact page.`,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4">Legal Document</Badge>
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Last updated: January 15, 2024
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Icons.FileText className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Document ID: TOS-2024-01</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Please read these terms carefully before using our services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="mb-4">
                  Welcome to our platform. These Terms and Conditions govern your use of our website and services. 
                  By accessing or using our services, you agree to be bound by these Terms.
                </p>
                <p>
                  If you disagree with any part of the terms, you may not access our services. 
                  We reserve the right to modify these terms at any time without prior notice.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="hover:shadow-sm transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icons.ChevronRight className="w-5 h-5 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <p className="whitespace-pre-line">{section.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Important Notes */}
          <Card className="mt-12 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.AlertTriangle className="w-5 h-5" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>By using our services, you confirm you are at least 18 years old</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>You agree to provide accurate and complete information</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>You are responsible for maintaining the confidentiality of your account</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Acceptance Section */}
          <div className="mt-12 p-8 border rounded-xl text-center">
            <Icons.Handshake className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Agreement to Terms</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              By continuing to use our services, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms and Conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Icons.Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button>
                <Icons.Check className="w-4 h-4 mr-2" />
                I Accept Terms
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}