import { useState, useEffect } from 'react'

const Pad = ({ volume, clip, sethistory, setconsole }) => {
    const [active, setActive] = useState(false);

    const handleKeyDown = (e) => {
        if (clip.keyCode === e.keyCode) {
            playSound()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger);
        setActive(true);
        setTimeout(() => setActive(false), 300);
        audioTag.volume = (volume)
        audioTag.currentTime = 0;
        audioTag.play();
        sethistory(prev => prev + clip.keyTrigger + ' ')
        setconsole(clip.id)
    }
    return (
        <div onClick={playSound} id={clip.id} className={`btn btn-secondary p-4 m-2 col-3 drum-pad ${active && "btn-success"}`} style={{ cursor: 'pointer' }}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url} />{clip.keyTrigger}
        </div>
    )
}

export default Pad
