import Footersmcard from "./footersmcard";
import Image from "next/image";

function Footercard() {
  return (
    <div className='p-10 '>

      <div className="max-w-310 mx-auto md:flex md:justify-start  items-center ">
        <div className="w-62 ">
          <h1 className="inter text-[25px] mt-10">SHOP</h1>
          <p className="text-sm font-thin mt-5 mb-5">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
          <div className="flex space-x-3 mt-5 " >
            <Image src="/logo/facebook.png" width={30} height={30} className="cursor-pointer" alt="" />
            <Image src="/logo/insta.png" width={30} height={30} className="cursor-pointer" alt="" />
            <Image src="/logo/github.png" width={30} height={30} className="cursor-pointer" alt="" />
            <Image src="/logo/twiter.png" width={30} height={30} className="cursor-pointer" alt="" />
          </div>

        </div>
        <Footersmcard />

      </div>

      <hr className="m-5  border-gray-300" />

      <div className="md:flex justify-between items-center max-w-300 mx-auto">
        <div>
          <h1 className="font-thin text-sm">Shop.co © 2000-2023, All Rights Reserved</h1>
        </div>
        <div className="flex items-center mt-5 md:m-0 ">
          <Image src="/payment/visa.png" width={55} height={30} className="cursor-pointer" alt="" />
          <Image src="/payment/gpay.png" width={55} height={30} className="cursor-pointer" alt="" />
          <Image src="/payment/ipay.png" width={55} height={30} className="cursor-pointer" alt="" />
          <Image src="/payment/paypal.png" width={55} height={30} className="cursor-pointer" alt="" />
          <Image src="/payment/pay.png" width={55} height={30} className="cursor-pointer" alt="" /> 
          </div>
      </div>




    </div>
  )
}

export default Footercard