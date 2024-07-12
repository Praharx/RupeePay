"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import axios from 'axios'
import { signUpSchema,signUpType } from '@repo/zod_type/zod_type';
import { useRouter } from 'next/navigation';


const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<signUpType>({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    //zod validate
    if(!signUpSchema.safeParse(formData).success){
      alert("Please enter valid types of inputs")
    }
    //backend request
    const response =await axios.post("http://localhost:3000/api/signin", formData)
    //success check
    if(!response.data.success){
      alert(response.data.msg)
    }else{
      router.push("/dashboard")
    }
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">SignIn</h2>
      <div className="mb-4">
        <Label htmlFor="username">Username</Label>
        <Input 
          type="text" 
          id="username" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input 
          type="password" 
          id="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <Button type="submit" className="w-full">SignIn</Button>
    </form>
  );
};

export default SignupForm;
