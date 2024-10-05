'use client';
// import { useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"
// import LogoutButton from "../ui/LogoutButton";

const Navbar = () => {

    // const session = useSession();

    return (
        <nav className="bg-yellow-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <Link href="/blogs" className="flex items-center">
                            <Image
                                src="https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg"
                                alt="Logo"
                                height="50"
                                width="50"
                                quality={100}
                                className="rounded-full shadow-lg"
                            />
                            <span className="text-white text-2xl font-bold ml-3">Blog Website</span>
                        </Link>
                    </div>

                    <div className="flex space-x-6 items-center">
                        <Link href="/blogs" className="text-white hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-medium transition ease-in-out duration-300">
                            Home
                        </Link>
                        {/* {session?.data?.user?.role == 'ADMIN' && (
                            <Link href="/blogs/add-blog" className="text-white hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-medium transition ease-in-out duration-300">
                                Create Blog
                            </Link>
                        )}

                        {session?.data?.user?.role === 'ADMIN' || session?.data?.user?.role === 'USER' && (
                            <Link href="/blogs/add-preference" className="text-white hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-medium transition ease-in-out duration-300">
                                Update Preference
                            </Link>
                        )}

                        {session?.data?.user?.role == 'ADMIN' && (
                            <Link href="/admin/dashboard" className="text-white hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-medium transition ease-in-out duration-300">
                                Admin
                            </Link>
                        )}

                        {session && (
                            <LogoutButton label={'Logout'} />
                        )}

                        {!session && (
                            <Link href="/auth/login" className="text-white hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-medium transition ease-in-out duration-300">
                                Login
                            </Link>
                        )} */}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
