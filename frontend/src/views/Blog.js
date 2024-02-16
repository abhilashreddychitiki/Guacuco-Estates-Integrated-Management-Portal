import React from "react";

// assets
export default function Blog() {
  const fitScreen = {
    position:'fixed',
    top:'0',
    left:'0',
    bottom:'0',
    right:'0',
    width:'100vw',
    height:'100vh',
    border:'none',
    margin:'0',
    padding:'0',
    overflow:'hidden',
  };
  return (
    <>
      <iframe title="Blogs" src="https://aishwaryagudipudi07.wordpress.com" style={fitScreen}></iframe>
    </>
  );
}
