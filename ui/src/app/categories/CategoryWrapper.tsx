"use client";
import React from "react";
import Category from "@/components/category/Category";

interface CategoryWrapperProps {
    userEmail: string;
}

export default function CategoryWrapper({ userEmail }: CategoryWrapperProps) {
    return <Category userEmail={userEmail} />;
}
