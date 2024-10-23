const DownloadIcon = () => {
    return (
        <svg fill="#fff" width="40" height="35" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" stroke="#fff">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
               stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M512 666.5L367.2 521.7l36.2-36.2 83 83V256h51.2v312.5l83-83 36.2 36.2L512 666.5zm-204.8 50.3V768h409.6v-51.2H307.2z"></path>
            </g>
        </svg>
    )
}
const LightModeIcon = ({className = "", title = ""}) => {
    return (
        <i class={`cIcon cIcon-LightMode ${className}`} title={title}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentcolor"
                 viewBox="0 0 1024 1024">
                <path
                    d="M512 384c70.4 0 128 57.6 128 128s-57.6 128-128 128-128-57.6-128-128 57.6-128 128-128m0-85.3c-117.8 0-213.3 95.6-213.3 213.3s95.6 213.3 213.3 213.3 213.3-95.6 213.3-213.3-95.6-213.3-213.3-213.3zM85.3 554.7h85.4c23.5 0 42.7-19.2 42.6-42.7s-19.2-42.7-42.6-42.7H85.3c-23.5 0-42.7 19.2-42.6 42.7s19.2 42.7 42.6 42.7z m768 0h85.4c23.5 0 42.7-19.2 42.6-42.7s-19.2-42.7-42.6-42.7h-85.4c-23.5 0-42.7 19.2-42.6 42.7s19.2 42.7 42.6 42.7zM469.3 85.3v85.4c0 23.5 19.2 42.7 42.7 42.6s42.7-19.2 42.7-42.6V85.3c0-23.5-19.2-42.7-42.7-42.6s-42.7 19.2-42.7 42.6z m0 768v85.4c0 23.5 19.2 42.7 42.7 42.6s42.7-19.2 42.7-42.6v-85.4c0-23.5-19.2-42.7-42.7-42.6s-42.7 19.2-42.7 42.6zM255.6 195.4a42.5 42.5 0 0 0-60.2 0 42.5 42.5 0 0 0 0 60.2l45.2 45.2c16.6 16.6 43.9 16.6 60.2 0s16.6-43.9 0-60.2L255.6 195.4z m527.8 527.8a42.5 42.5 0 0 0-60.2 0 42.5 42.5 0 0 0 0 60.2l45.2 45.2c16.6 16.6 43.9 16.6 60.2 0a42.5 42.5 0 0 0 0-60.2l-45.2-45.2z m45.2-467.6a42.5 42.5 0 0 0 0-60.2 42.5 42.5 0 0 0-60.2 0l-45.2 45.2c-16.6 16.6-16.6 43.9 0 60.2s43.9 16.6 60.2 0l45.2-45.2zM300.8 783.4a42.5 42.5 0 0 0 0-60.2 42.5 42.5 0 0 0-60.2 0l-45.2 45.2c-16.6 16.6-16.6 43.9 0 60.2s43.9 16.6 60.2 0l45.2-45.2z">
                </path>
            </svg>
        </i>
    );
};


const DarkModeIcon = ({className = "", title = ""}) => {
    return (
        <i class={`cIcon cIcon-DarkMode ${className}`} title={title}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentcolor"
                 viewBox="0 0 1024 1024">
                <path
                    d="M512 128a384 384 0 1 0 384 384c0-19.6-1.7-39.3-4.3-58a229.9 229.9 0 0 1-187.7 96.4 230.5 230.5 0 0 1-134-418.1c-18.8-2.6-38.4-4.3-58-4.3z">
                </path>
            </svg>
        </i>
    );
};

const CheckedIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
             class="icon icon-tabler icons-tabler-filled icon-tabler-point">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"/>
        </svg>
    )
}

const FilledStarIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"
             height="40px" width="40px" color={"#FFBF00"}>
            <path style={`fill:#FFBF00`}
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006Z"
                  clip-rule="evenodd"></path>
        </svg>
    );
}

const GradientStarIcon = ( id: number, offset: number) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"
             height="40px" width="40px">
            <defs>

                <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop id="stop1" stop-color="#FFBF00" offset={`${offset}%`}/>
                    <stop id="stop2" stop-color="transparent"/>
                </linearGradient>
            </defs>
            <path style={`fill:url(#g-${id})`}
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006Z"
                  clip-rule="evenodd"></path>
        </svg>
    );
}

const HomeIcon = () => {
    return (<svg stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
         style="overflow: visible; color: #0284c7;" height="1em" width="1em" fill={"#0284c7"}>
        <path
            d="M946.5 505 534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
    </svg>);
}
export {
    DownloadIcon,
    LightModeIcon,
    DarkModeIcon,
    CheckedIcon,
    FilledStarIcon,
    GradientStarIcon,
    HomeIcon
}