import Footersmcard from "./footersmcard";

function Footercard() {
  return (
    <div className='p-10 '>

      <div className="max-w-310 mx-auto md:flex md:justify-start  items-center ">
        <div className="w-62 ">
          <h1 className="inter text-[25px] mt-10">SHOP</h1>
          <p className="text-sm font-thin mt-5 mb-5">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
          <div className="flex space-x-3 mt-5  cursor-pointer" >
            {/* <img src="/img/logo/1.png"  alt="" />
            <img src="/img/logo/2.png" alt="" />
            <img src="/img/logo/3.png" alt="" />
            <img src="/img/logo/4.png" alt="" /> */}
          </div>

        </div>
        <Footersmcard />

      </div>

      <hr className="m-5  border-gray-300" />

      <div className="md:flex justify-between items-center max-w-300 mx-auto">
        <div>
          <h1 className="font-thin text-sm">Shop.co © 2000-2023, All Rights Reserved</h1>
        </div>
        {/* <div className="flex items-center mt-5 md:m-0 ">
          <img src="/img/payment/p1.png" className="w-13" alt="" />
          <img src="/img/payment/p2.png" className="w-13" alt="" />
          <img src="/img/payment/p3.png" className="w-13" alt="" />
          <img src="/img/payment/p4.png" className="w-13" alt="" />
          <img src="/img/payment/p5.png" className="w-13" alt="" />
        </div> */}
      </div>




    </div>
  )
}

export default Footercard