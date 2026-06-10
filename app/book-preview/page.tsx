"use client";

import FlipBook from "@/components/FlipBook";

export default function BookPreview() {
  return (
    <div style={{
      minHeight:       "100vh",
      backgroundColor: "#f4efe5",
      display:         "flex",
      flexDirection:   "column",
      alignItems:      "center",
      justifyContent:  "center",
    }}>
      <FlipBook />
    </div>
  );
}
