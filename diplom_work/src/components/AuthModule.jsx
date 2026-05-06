import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode'

function AuthModule({onLoginSuccess}) {
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          onLoginSuccess(decoded);
        }}
        onError={() => {
          console.error('Login Failed');
        }}
      />
    </>
  );
}

export default AuthModule;