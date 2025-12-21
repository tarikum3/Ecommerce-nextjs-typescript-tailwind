"use client";

import React from "react";
import * as Icons from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      bio: "Former tech executive with 15+ years in e-commerce",
      image: "",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      bio: "Expert in scalable systems and cloud architecture",
      image: "",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Jessica Williams",
      role: "Head of Product",
      bio: "Product strategist with focus on user experience",
      image: "",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "David Kim",
      role: "Lead Designer",
      bio: "Award-winning designer with 10+ years experience",
      image: "",
      social: {
        linkedin: "#",
        dribbble: "#"
      }
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to revolutionize online shopping"
    },
    {
      year: "2021",
      title: "First Million Users",
      description: "Reached our first major milestone in user growth"
    },
    {
      year: "2022",
      title: "Series A Funding",
      description: "Secured $10M in funding to expand operations"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Launched services in 10+ new countries"
    },
    {
      year: "2024",
      title: "Award Recognition",
      description: "Received 'Best E-commerce Platform' award"
    }
  ];

  const values = [
    {
      title: "Customer First",
      description: "We prioritize our customers' needs above all else",
      icon: <Icons.Users className="w-6 h-6" />
    },
    {
      title: "Innovation",
      description: "Continuously improving and embracing new technologies",
      icon: <Icons.Lightbulb className="w-6 h-6" />
    },
    {
      title: "Integrity",
      description: "Honest and transparent in all our dealings",
      icon: <Icons.Shield className="w-6 h-6" />
    },
    {
      title: "Excellence",
      description: "Striving for the highest quality in everything we do",
      icon: <Icons.Star className="w-6 h-6" />
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-6">Our Story</Badge>
          <h1 className="text-5xl font-bold mb-6">
            Building the Future of{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              E-commerce
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're on a mission to create the most seamless and enjoyable shopping experience for millions of customers worldwide.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button>
              <Icons.Play className="w-4 h-4 mr-2" />
              Watch Our Story
            </Button>
            <Button variant="outline">
              <Icons.Briefcase className="w-4 h-4 mr-2" />
              Careers
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">10M+</div>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">50+</div>
                <p className="text-muted-foreground">Countries</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">500+</div>
                <p className="text-muted-foreground">Team Members</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">24/7</div>
                <p className="text-muted-foreground">Support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Story */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Icons.BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Our Journey</h2>
          </div>
          
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                  
                  {/* Content */}
                  <div className={`ml-8 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="hover:shadow-lg transition-all">
                      <CardHeader>
                        <Badge variant="outline" className="w-fit">{milestone.year}</Badge>
                        <CardTitle>{milestone.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and help us stay true to our mission
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="text-primary">
                      {value.icon}
                    </div>
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Meet Our Leadership</h2>
              <p className="text-muted-foreground">The talented people behind our success</p>
            </div>
            <Button variant="outline">
              <Icons.Users className="w-4 h-4 mr-2" />
              View All Team
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-all group">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 group-hover:scale-105 transition-transform">
                      <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/20 text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icons.Linkedin className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icons.Twitter className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12">
          <Icons.Sparkles className="absolute top-4 right-4 w-12 h-12 text-white/20" />
          <Icons.Sparkles className="absolute bottom-4 left-4 w-12 h-12 text-white/20" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about making a difference.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary">
                <Icons.Briefcase className="w-4 h-4 mr-2" />
                View Open Positions
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Icons.Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}