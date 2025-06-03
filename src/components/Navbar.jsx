import { Menubar } from "radix-ui";
import Container from "../utils/Container";

const Navbar = () => {
    return (
        <Menubar.Root className="flex gap-4 p-1 rounded-md h-auto">
            <Menubar.Menu>
                <Menubar.Trigger className="px-3 py-1 rounded hover:bg-gray-200 cursor-pointer">
                    File
                </Menubar.Trigger>
            </Menubar.Menu>

            <Menubar.Menu>
                <Menubar.Trigger className="px-3 py-1 rounded hover:bg-gray-200 cursor-pointer">
                    Edit
                </Menubar.Trigger>
            </Menubar.Menu>
        </Menubar.Root>
    );
};

export default Navbar;
