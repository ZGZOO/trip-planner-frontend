import React from 'react'
import './footer.scss'

const Footer = () => {
    return (
        <footer>
            <span>Copyright &copy; 2020-<span>{(new Date().getFullYear())}</span> Be Trippin All Rights Reserved</span>
        </footer>
    )
}

export default Footer
