import {Button} from 'antd';
import Link from 'next/link';

export default ()=>
   {
     
    return (
      <>
    <div>onedrive</div>

        <Button href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=9951a544-bcdd-4824-9651-d1703e54182d&scope=offline_access files.readwrite.all&response_type=code&redirect_uri=http://localhost:3000/auth/callback">aaa</Button>
 
      </>
    )
    }
  