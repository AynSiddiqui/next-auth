'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import AuthProfileMenu from "./AuthProfileMenu";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Close the menu when clicking anywhere outside
    useEffect(() => {
        function handleDocumentClick(event: any) {
            if (menuOpen && !event.target.closest(".menu-container")) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [menuOpen]);

    return (
        <>
            <div className="w-full bg-green-300 font-medium text-black sticky top-0">
                <div className="flex px-6 items-center justify-between h-14">
                    <div className="flex items-center justify-start">
                        LOGO
                    </div>

                    <div className="hidden sm:flex justify-end items-end">
                        <ul className="flex gap-x-4">
                            <li>
                                <Link href="/about">
                                    <p>About Us</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services">
                                    <p>Services</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts">
                                    <p>Contacts</p>
                                </Link>
                            </li>
                            <li>
                                <AuthProfileMenu />
                            </li>
                        </ul>
                    </div>
                    <div className="sm:hidden flex items-center">
                        <button
                            className="text-black p-2 focus:outline-none"
                            onClick={toggleMenu}
                        >
                            {menuOpen ? "✕" : "☰"}
                        </button>
                    </div>
                </div>
            </div>
            {menuOpen && (
                <div className="bg-green-300 text-black w-screen border-3 sm:hidden fixed top-14 menu-container">
                    <ul className="space-y-4 px-6 pb-3">
                        <li>
                            <Link href="/about">
                                <p>About Us</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/services">
                                <p>Services</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contacts">
                                <p>Contacts</p>
                            </Link>
                        </li>
                        <li>
                            <AuthProfileMenu />
                        </li>
                    </ul>
                </div>
            )}

        </>
    );
};

export default Navbar;
