'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '../supabase/server';

export async function actionLoginUser(data: { email: string; password: string }) {
  try {
    const { email, password } = data;
    
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: { message: error.message || 'Invalid login credentials' } };
    }

    revalidatePath('/', 'layout');
    return { data: { user: null }, error: null };
  } catch (error) {
    console.error('Unexpected login error:', error);
    return { 
      error: { 
        message: 'An unexpected error occurred during login.',
        data: null 
      } 
    };
  }
}

export async function actionSignUpUser(data: { email: string; password: string }) {
  try {
    const { email, password } = data;
    
    if (!email || !password) {
      return { 
        error: { 
          message: 'Email and password are required.',
          data: null 
        } 
      };
    }

    const supabase = await createClient();
    const { data: authData, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });

    if (error) {
      if (error.message.includes('User already registered')) {
        return { 
          error: { 
            message: 'An account with this email already exists. Please try logging in instead.',
            data: null 
          } 
        };
      }
      
      return { 
        error: { 
          message: error.message || 'Signup failed',
          data: null 
        } 
      };
    }

    revalidatePath('/', 'layout');
    return { 
      data: { user: authData.user }, 
      error: null,
      message: 'Check your email for the confirmation link.'
    };
  } catch (error) {
    console.error('Unexpected signup error:', error);
    return { 
      error: { 
        message: 'An unexpected error occurred during signup.',
        data: null 
      } 
    };
  }
}