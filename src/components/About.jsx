import aboutImage from "../assets/images/about-image.png";

export const About = () => {

    return (
        <div className="bg-white" id = "about">
            <div className="p-24 grid grid-cols-2">
                <div className="">
                    <h2 className="text-2xl font-medium">About Us</h2>
                    <p className="text-lg">
                    This is a food ordering app created by using MERN stack for Project-2. 
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <img src={aboutImage} alt="" className="w-[400px] h-[400px] object-cover" />
                </div>
            </div>
        </div>
    )
}