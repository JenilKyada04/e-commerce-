const name = [{
    name:"Company",
    p1:"About Us",
    p2:"Features",
    p3:"Works",
    p4:"Career",
},
{
   name:"Help",
    p1:"Customer Support",
    p2:"Delivery Details",
    p3:"Terms & Conditions",
    p4:"Privacy Policy",  
},
{
   name:"FAQ",
    p1:"Account",
    p2:"Manage Deliveries",
    p3:"Orders",
    p4:"Payments",  
},
{
   name:"Resources",
    p1:"Free eBooks",
    p2:"Development Tutorial",
    p3:"How to - Blog",
    p4:"Youtube Playlist",  
},
]


function Footersmcard() {
  return (
    <div>
        <div className="mt-10 grid  md:grid-cols-4 gap-10 md:ml-30">

            {name.map((item, index) => (    
                <div key={index} className="md:flex flex-col md:flex-col gap-3 ">
                    <h1 className="text-lg tracking-widest">{item.name}</h1>
                    <p className="text-sm font-thin hover:underline cursor-pointer">{item.p1}</p>
                    <p className="text-sm font-thin hover:underline cursor-pointer">{item.p2}</p>
                    <p className="text-sm font-thin hover:underline cursor-pointer">{item.p3}</p>
                    <p className="text-sm font-thin hover:underline cursor-pointer">{item.p4}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Footersmcard