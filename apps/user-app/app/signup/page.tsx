"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import axios from 'axios'
import { signUpSchema,signUpType } from '@repo/zod_type/zod_type';
import { useRouter } from 'next/navigation';

interface signUpInputs extends signUpType{
  confirmPassword: string
}

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<signUpInputs>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    // check for same password
    const {password, confirmPassword} = formData;
    if(password !== confirmPassword){
      alert("Please put the same password for confirmation.")
    }
    //zod validate
    else if(!signUpSchema.safeParse(formData).success){
      alert("Please enter valid types of inputs")
    }
    //backend request
    const response =await axios.post("http://localhost:3000/api/signup", formData)
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
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
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
      <div className="mb-4">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          required 
        />
      </div>
      <Button type="submit" className="w-full">Signup</Button>
    </form>
  );
};

export default SignupForm;
