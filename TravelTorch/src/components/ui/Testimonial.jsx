import React, {useRef} from 'react'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/user-1.png'
import user_2 from '../../assets/user-2.png'
import user_3 from '../../assets/user-3.png'
import user_4 from '../../assets/user-4.png'

const Testimonial = () => {
    const slider = useRef();
    let tx = 0;

    const slideForward = () => {
        if (tx > -50) {
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    }
    
    const slideBackward = () => {
        if (tx < 0) {
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    }

    return (
        <div className="my-20 mx-auto px-20 relative">
            
      <h2 className="text-3xl font-bold text-center mb-6">Client Testimonials</h2>
            <img 
                src={next_icon} 
                alt="" 
                className="absolute top-1/2 right-0 -translate-y-1/2 p-4 w-12 rounded-full cursor-pointer bg-[#212EA0]"
                onClick={slideForward}
            />
            <img 
                src={back_icon} 
                alt="" 
                className="absolute top-1/2 left-0 -translate-y-1/2 p-4 w-12 rounded-full cursor-pointer bg-[#212EA0]"
                onClick={slideBackward}
            />
            <div className="overflow-hidden">
                <ul ref={slider} className="flex w-[200%] overflow-x-hidden transition-all duration-500 -translate-x-[25%]">
                    <li className="list-none w-1/2 p-5">
                        <div className="shadow-[0_0_20px_rgba(0,0,0,0.05)] p-10 rounded-lg text-[#676767] leading-relaxed">
                            <div className="flex items-center mb-5 text-sm">
                                <img src={user_1} alt="" className="w-16 rounded-full mr-3 border-2 border-[#676767]" />
                                <div>
                                    <h3 className="text-[#212EA0]">Birag Acharya</h3>
                                    <span>Inaruwa, Nepal</span>
                                </div>
                            </div>
                            <p>TravelTorch made planning my Nepal trekking adventure so simple! Their package builder helped me customize the perfect itinerary, and their local guides were incredibly knowledgeable. The price was much better than booking everything separately. I'll definitely use TravelTorch for my next adventure!</p>
                        </div>
                    </li>
                    <li className="list-none w-1/2 p-5">
                        <div className="shadow-[0_0_20px_rgba(0,0,0,0.05)] p-10 rounded-lg text-[#676767] leading-relaxed">
                            <div className="flex items-center mb-5 text-sm">
                                <img src={user_2} alt="" className="w-16 rounded-full mr-3 border-2 border-[#676767]" />
                                <div>
                                    <h3 className="text-[#212EA0]">Sujal Rai</h3>
                                    <span>Dharan, Nepal</span>
                                </div>
                            </div>
                            <p>As a frequent traveler, I appreciate how TravelTorch's clean interface saves me time. Their flight+hotel bundles to Southeast Asia saved me 30% compared to other sites. The mobile app is perfect for last-minute bookings when I'm already on the road. Highly recommended for fellow Nepali travelers!</p>
                        </div>
                    </li>
                    <li className="list-none w-1/2 p-5">
                        <div className="shadow-[0_0_20px_rgba(0,0,0,0.05)] p-10 rounded-lg text-[#676767] leading-relaxed">
                            <div className="flex items-center mb-5 text-sm">
                                <img src={user_3} alt="" className="w-16 rounded-full mr-3 border-2 border-[#676767]" />
                                <div>
                                    <h3 className="text-[#212EA0]">Arbaz Khan</h3>
                                    <span>Inaruwa, Nepal</span>
                                </div>
                            </div>
                            <p>TravelTorch's weekend getaway packages from Inaruwa are a game-changer! I've discovered amazing nearby destinations I never would have considered. Their customer support helped me reschedule when unexpected weather hit, with no extra fees. Now all my friends use TravelTorch for our group trips.</p>
                        </div>
                    </li>
                    <li className="list-none w-1/2 p-5">
                        <div className="shadow-[0_0_20px_rgba(0,0,0,0.05)] p-10 rounded-lg text-[#676767] leading-relaxed">
                            <div className="flex items-center mb-5 text-sm">
                                <img src={user_4} alt="" className="w-16 rounded-full mr-3 border-2 border-[#676767]" />
                                <div>
                                    <h3 className="text-[#212EA0]">Prashant Paudel</h3>
                                    <span>Itahari, Nepal</span>
                                </div>
                            </div>
                            <p>Planning our family reunion through TravelTorch was stress-free. Their group booking feature handled our 12-person trip seamlessly, and the family-friendly hotel recommendations were perfect. The price match guarantee ensured we got the best deal available. We're already planning our next trip through them!</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Testimonial