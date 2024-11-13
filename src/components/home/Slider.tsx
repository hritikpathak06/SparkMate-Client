import React from "react";

const Slider = () => {
  const testimonials = [
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYf3ArTo30OMbVD8TISYQu8KyhyrrVtc96Q&s",
      name: "Alex Martin",
      role: "User since 2023",
      text: "I found my soulmate here! The app made it easy to connect with like-minded people.",
    },
    {
      image: "https://thumbs.dreamstime.com/b/portrait-young-handsome-man-white-shirt-outdoor-portrait-young-handsome-man-white-shirt-outdoor-nice-appearance-131934608.jpg",
      name: "Sarah Johnson",
      role: "Premium Member",
      text: "Amazing platform! The profiles are genuine, and I felt safe and supported throughout my experience.",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s",
      name: "Michael Lee",
      role: "Member since 2022",
      text: "Best dating app I’ve used! The matching system is fantastic, and I met some truly wonderful people here.",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL6YJKJ0bmIFZnZiuM1EexHzDXZP4ucV1ZBw&s",
      name: "Emily Chen",
      role: "VIP Member",
      text: "I was hesitant at first, but now I couldn’t be happier. I met my partner, and it’s all thanks to this app!",
    },
    {
      image: "https://media.istockphoto.com/id/1158717512/photo/smiling-indian-young-business-woman-wear-blue-jeans-shirt-looking-at-camera-isolated-on-grey.jpg?s=612x612&w=0&k=20&c=TGj38rrHG7XZbbpQT7q1g3A2_7b-WQw1z91Xf4sYF1w=",
      name: "Priya Singh",
      role: "Member since 2023",
      text: "I’ve met amazing people here! The app is easy to use and has made dating so much fun.",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGXIdr54LCPbM5x-QN9VXBUMHgDJHPzg6gfg&s",
      name: "James Brown",
      role: "Free Member",
      text: "Great community and excellent matches. Highly recommend for anyone looking for a serious connection.",
    },
  ];
  

  return (
    <div className="banner">
      <div className="slider" style={{ "--quantity": testimonials.length } as React.CSSProperties}>
        {testimonials.map((testimonial, index) => (
          <div className="item" key={index} style={{ "--position": index + 1 } as React.CSSProperties}>
            <div className="testimonial">
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
