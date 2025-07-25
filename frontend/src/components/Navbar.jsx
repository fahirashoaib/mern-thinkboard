import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

const Navbar = () => {
    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-[#00FF9D] font-mono tracking-tight">
                        ThinkBoard
                    </h1>
                    <div className="flex items-center gap-4">
                        <Link to={"/create"} className="btn bg-[#00FF9D] text-black hover:bg-[#00FF9D]/90 transition-all rounded-full">
                            <PlusIcon className="size-5" />
                            <span>New Note</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar