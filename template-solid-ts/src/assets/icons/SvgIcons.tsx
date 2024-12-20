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
             height="25px" width="25px" color={"#FFBF00"}>
            <path style={`fill:#FFBF00`}
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006Z"
                  clip-rule="evenodd"></path>
        </svg>
    );
}

const GradientStarIcon = ( id: number, offset: number) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"
             height="25px" width="25px">
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


const DownloadIcon2 = () => {
    return (<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                 style="overflow: visible; color: currentcolor;" height="1em" width="1em">
        <path fill="currentColor" d="m11.5 7-4 4-4-4H6V1h3v6zm-4 4H0v4h15v-4H7.5zm6.5 2h-2v-1h2v1z"></path>
    </svg>)
}

const EditIcon = () => {
    return (
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
             style="overflow: visible; color: currentcolor;" height="35px" width="35px">
            <path
                d="M13.23 1h-1.46L3.52 9.25l-.16.22L1 13.59 2.41 15l4.12-2.36.22-.16L15 4.23V2.77L13.23 1zM2.41 13.59l1.51-3 1.45 1.45-2.96 1.55zm3.83-2.06L4.47 9.76l8-8 1.77 1.77-8 8z"></path>
        </svg>
    )
}

const PhoneIcon = () => {
    return (
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
             style="overflow: visible; color: currentcolor;position: relative;top: 5px;right: 5px;" height="25px" width="25px">
            <path
                d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
        </svg>
    )
}

const MailIcon = () => {
    return (
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
             style="overflow: visible; color: currentcolor;position: relative;top: 5px;right: 5px;" height="25px" width="25px">
            <path
                d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232 512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
        </svg>
    )
}

const VerifiedIcon = (color:string) => {
    return (
        <svg fill={color} stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
             style="overflow: visible; color: currentcolor;position: relative;top: 5px;right: 5px;" height="50px" width="50px">
            <path
                d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm337 113L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
        </svg>
    )
}

const SeePasswordIcon = () => {
    return (
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
             style="overflow: visible; color: currentcolor;" height="50px" width="50px">
            <path
                d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
        </svg>
    )
}

const LoginIcon = () => {
    return (
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
             style="overflow: visible; color: currentcolor;" height="25px" width="25px">
            <path d="m10.998 16 5-4-5-4v3h-9v2h9z"></path>
            <path
                d="M12.999 2.999a8.938 8.938 0 0 0-6.364 2.637L8.049 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051S20 10.13 20 12s-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637C21.063 16.665 22 14.405 22 12s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path>
        </svg>
    )
}

const LogOutIcon = () => {
    return (
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             style="overflow: visible; color: currentcolor;" height="20px" width="20px">
            <path d="m2 12 5 4v-3h9v-2H7V8z"></path>
            <path
                d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path>
        </svg>
    )
}

const HidePasswordIcon = () => {
    return (
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
             style="overflow: visible; color: currentcolor;" height="50px" width="50px">
            <path
                d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z"></path>
            <path
                d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z"></path>
        </svg>
    )
}
const ProfileIcon = () => {
    return(
        <svg fill="none" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             style="overflow: visible; color: currentcolor;" height="20px" width="20px">
            <path fill="currentColor" fill-rule="evenodd"
                  d="M16 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" clip-rule="evenodd"></path>
            <path fill="currentColor" fill-rule="evenodd"
                  d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1ZM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12Zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21Z"
                  clip-rule="evenodd"></path>
        </svg>
    )
}
export {
    DownloadIcon,
    LightModeIcon,
    DarkModeIcon,
    CheckedIcon,
    FilledStarIcon,
    GradientStarIcon,
    HomeIcon,
    DownloadIcon2,
    EditIcon,
    PhoneIcon,
    MailIcon,
    VerifiedIcon,
    SeePasswordIcon,
    HidePasswordIcon,
    LoginIcon,
    LogOutIcon,
    ProfileIcon
}