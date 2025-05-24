import AuthForm from '../AuthForm'
import type AuthFormData from '@/lib/types';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
      const navigate = useNavigate();
    const handleSignUp = (data:AuthFormData) =>{
        // call ur backend api to save the data
        console.log(data, "from page");
        // when the db call succes it navigate to the profile page
        navigate('/profile');
    }
  return (
   <div className='flex justify-center items-center w-full min-h-screen'>
        <AuthForm type='signup' onSubmitForm={handleSignUp}/>
    </div>
  )
}

export default SignUp