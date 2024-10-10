'use client';
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logoutbutton from "./Logoutbutton";

const Navbar = () => {
    const session = useSession();

    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-700 h-24 mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-end rounded-3xl shadow-lg border border-gray-600">
            {/* Logo and Branding */}
            <div className="flex items-center space-x-4">
                <Link href="/blogs" className="flex items-center">
                    <Image
                        src="https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg"
                        alt="Logo"
                        height="80"
                        width="80"
                        quality={100}
                        className="rounded-full shadow-md border-2 border-white"
                    />
                    <span className="text-white text-3xl font-extrabold ml-3 tracking-wide">BlogSite</span>
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="mr-24 flex gap-10 items-center justify-center">
                <Link href="/blogs" className="ml-8 text-white hover:text-yellow-300 text-lg font-medium transition-transform transform hover:scale-110 ease-in-out duration-300">
                    Home
                </Link>

                {session?.data?.user && (
                    <Link href="/blogs/Addblog" className="text-white hover:text-yellow-300 text-lg font-medium transition-transform transform hover:scale-110 ease-in-out duration-300">
                        Create Blog
                    </Link>
                )}

                {/* Authentication Buttons */}
                {session?.data?.user ? (
                    <Logoutbutton label="Logout" />
                ) : (
                    <Link href="/auth/register/login" className="text-white bg-blue-500 hover:bg-blue-600 text-lg font-medium py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-110 ease-in-out duration-300">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
