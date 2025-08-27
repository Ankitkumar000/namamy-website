'use client';

import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Calendar, Users, Heart, Briefcase, TrendingUp } from 'lucide-react';

interface CareersPageProps {
  params: {
    locale: string;
  };
}

export default function CareersPage({ params: { locale } }: CareersPageProps) {
  const breadcrumbItems = [
    { label: 'Careers' },
  ];

  const jobOpenings = [
    {
      id: 1,
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'House no-263, Police Station Road, Sabour, Bhagalpur, 813210, Bihar, India',
      type: 'Full-time',
      experience: '3-5 years',
      postedDate: '2024-01-15',
      description: 'Lead our digital marketing initiatives including social media, content marketing, and online advertising campaigns.',
      requirements: ['Bachelor\'s degree in Marketing or related field', '3+ years digital marketing experience', 'Experience with Google Ads, Facebook Ads', 'Strong analytical skills'],
    },
    {
      id: 2,
      title: 'Quality Control Specialist',
      department: 'Operations',
      location: 'House no-263, Police Station Road, Sabour, Bhagalpur, 813210, Bihar, India',
      type: 'Full-time',
      experience: '2-4 years',
      postedDate: '2024-01-10',
      description: 'Ensure the highest quality standards for our makhana products through rigorous testing and quality assurance processes.',
      requirements: ['Food Technology or related degree', 'FSSAI knowledge', 'Experience in food quality control', 'Attention to detail'],
    },
    {
      id: 3,
      title: 'Customer Success Executive',
      department: 'Customer Service',
      location: 'Remote',
      type: 'Full-time',
      experience: '1-3 years',
      postedDate: '2024-01-08',
      description: 'Provide exceptional customer service and support to ensure customer satisfaction and retention.',
      requirements: ['Excellent communication skills', 'Customer service experience', 'Problem-solving abilities', 'Hindi and English proficiency'],
    },
    {
      id: 4,
      title: 'Supply Chain Coordinator',
      department: 'Operations',
      location: 'House no-263, Police Station Road, Sabour, Bhagalpur, 813210, Bihar, India',
      type: 'Full-time',
      experience: '2-4 years',
      postedDate: '2024-01-05',
      description: 'Manage supplier relationships and coordinate supply chain operations to ensure timely delivery of products.',
      requirements: ['Supply chain management degree', 'Experience with inventory management', 'Strong organizational skills', 'Excel proficiency'],
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, wellness programs, and free healthy snacks',
    },
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Career development programs, skill building workshops, and internal promotions',
    },
    {
      icon: Users,
      title: 'Great Team Culture',
      description: 'Collaborative work environment, team building activities, and inclusive culture',
    },
    {
      icon: Briefcase,
      title: 'Work-Life Balance',
      description: 'Flexible working hours, remote work options, and generous leave policies',
    },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          
          <div className="mt-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Join Our Mission
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Be part of a team that's revolutionizing healthy snacking in India. Help us bring premium makhana to every household.
              </p>
              
              <div className="bg-gradient-to-r from-organic-500 to-makhana-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Why Choose Namamy?</h2>
                <p className="text-lg text-organic-100">
                  We're not just a food company - we're a mission-driven organization committed to promoting healthy living through traditional superfoods. Join us in making a positive impact on people's lives.
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-organic-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="w-8 h-8 text-organic-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Job Openings */}
            <div className="mb-16">
              <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
                Current Openings
              </h2>
              
              {jobOpenings.length > 0 ? (
                <div className="space-y-6">
                  {jobOpenings.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                              <h3 className="text-2xl font-bold text-gray-900">
                                {job.title}
                              </h3>
                              <span className="bg-organic-100 text-organic-800 px-3 py-1 rounded-full text-sm font-medium">
                                {job.department}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                <span className="text-sm">{job.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">{job.experience}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mb-4">
                              {job.description}
                            </p>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                                {job.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="mt-6 lg:mt-0 lg:ml-8">
                            <Button 
                              size="lg" 
                              className="w-full lg:w-auto"
                              onClick={() => window.open(`mailto:contact@namamy.com?subject=Application for ${job.title}&body=Dear Hiring Team,%0D%0A%0D%0AI am interested in applying for the ${job.title} position.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ABest regards`, '_blank')}
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center">
                  <CardContent className="p-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      No Current Openings
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We don't have any open positions at the moment, but we're always looking for talented individuals to join our team.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => window.open('mailto:contact@namamy.com?subject=Interest in Future Opportunities&body=Dear Hiring Team,%0D%0A%0D%0AI am interested in future opportunities at Namamy.%0D%0A%0D%0APlease keep my resume on file for upcoming positions.%0D%0A%0D%0ABest regards', '_blank')}
                    >
                      Send Your Resume
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Application Process */}
            <div className="mb-16">
              <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
                Application Process
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-organic-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Apply</h3>
                  <p className="text-gray-600 text-sm">Submit your application with resume and cover letter</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-organic-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Review</h3>
                  <p className="text-gray-600 text-sm">Our HR team reviews your application within 5 business days</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-organic-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview</h3>
                  <p className="text-gray-600 text-sm">Participate in our interview process (phone and in-person)</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-organic-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome</h3>
                  <p className="text-gray-600 text-sm">Join our team and start your journey with us</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <Card className="bg-gradient-to-r from-makhana-500 to-organic-600 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
                <p className="text-xl text-makhana-100 mb-6 max-w-2xl mx-auto">
                  We're excited to hear from talented individuals who share our passion for healthy living and quality products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => window.open('mailto:careers@namamy.com?subject=General Inquiry&body=Dear Hiring Team,%0D%0A%0D%0AI am interested in learning more about career opportunities at Namamy.%0D%0A%0D%0APlease let me know how I can contribute to your team.%0D%0A%0D%0ABest regards', '_blank')}
                  >
                    careers@namamy.com
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-organic-600"
                  >
                    +91 7261071570, 70912 60484
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}