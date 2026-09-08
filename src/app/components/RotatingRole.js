"use client";

import { useState, useEffect } from "react";

const roles = ["Musician", 
    "Content Creator", 
    "Software Engineer", 
    "Writer", 
    "Actor"];

function getArticle(word) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export default function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 300);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const currentRole = roles[index];
  const article = getArticle(currentRole);

  return (
    <span className={`role-fade ${visible ? "opacity-100" : "opacity-0"}`}>
      {article}{" "}
      <span className="role-gradient">
        {currentRole}
      </span>
    </span>
  );
}