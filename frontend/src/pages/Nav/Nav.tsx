import { Player } from "@lottiefiles/react-lottie-player"



const Nav  = () => {

    return (
        <nav className="relative px-4 py-1 flex justify-between items-center bg-white">
		<a className="text-3xl font-bold leading-none" href="https://mariohernandezporfolio.netlify.app/">
            <Player src='https://assets10.lottiefiles.com/packages/lf20_uio5iafn.json' loop  autoplay style={{height:"50px", display: "flex" }}  />
		</a>
	</nav>
    )
}

export default Nav