import { Fragment } from "react";
import Link from "next/link";


function Navbar() {
    return (
        <Fragment>

            <div>
                <Link href="/">HOME</Link>
            </div>
            <div>
                <Link href="/new-game">ADD A NEW GAME</Link>
            </div>
            <div>
                <Link href="/new-player">ADD A NEW PLAYER</Link>
            </div>
            <div>
                <Link href="/head-to-head">HEAD TO HEAD</Link>
            </div>

        </Fragment>
    );
}

export default Navbar;