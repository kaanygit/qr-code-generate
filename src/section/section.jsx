import { Fragment, useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Transition } from '@headlessui/react';
import {toast,ToastContainer} from 'react-toastify';
import {HiOutlineDownload} from 'react-icons/hi';
import { saveAs } from 'file-saver';
import 'react-toastify/dist/ReactToastify.css';


const Section=()=>{
    const [link, setLink] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);

    const qrcodeImage=useRef()
    const inputValue=useRef();
      const generateLink=()=>{
        if(inputValue.current.value!==''){
            if(inputValue.current.value.startsWith('https://') || inputValue.current.value.startsWith('www.')){
                setLink(inputValue.current.value);
            }else{
                toast.error('Please enter a valid link address')
            }
        }else{
            toast.error('Place Enter The Link');
        }

      }
    const downloadQrCode=()=>{
        const canvas=qrcodeImage.current;
        if (canvas) {
            const link = document.createElement('a');
            link.href = canvas.src;
            link.download = 'qrcode.png';
            link.click();
          }
    }

    useEffect(() => {
        setShowQRCode(true);
    }, []);
    return (
        <Fragment>
            <ToastContainer/>

            <div className="container mx-auto flex flex-col justify-center items-center max-h-screen h-screen border-box bg-gray-200 w-full ">
                <div>
                    <div className="title-qr-code-section-div mb-3">
                        <Transition
                            show={showQRCode}
                            enter="transition-all duration-1000 transform"
                            enterFrom="-translate-x-full opacity-0"
                            enterTo="translate-x-0 opacity-100"
                            leave="transition-all duration-300 transform"
                            leaveFrom="translate-x-0 opacity-100"
                            leaveTo="-translate-x-full opacity-0"
                        >
                            <h1 className="title-qr-code-section text-center font-bold text-3xl border-b border-gray-800 pb-3">QR Code Generator</h1>
                        </Transition>
                    </div>
                    <div>
                        <div className="content-divs w-full flex">
                            <input type="text" title='Please start with https:// or www. generate with'  ref={inputValue} placeholder="Please Enter The Url" className="input-box w-full rounded-l-lg py-2 px-2 "/>
                            <button type="button" onClick={generateLink} className="generate-button bg-sky-400 rounded-r-lg hover:bg-sky-500 py-2 px-2 ">Generate</button>
                        </div>
                        <div className="qr-code-image-div flex justify-center items-center text-center mt-4">
                            <Transition
                                show={link?showQRCode:false}
                                enter="transition-all duration-500 transform"
                                enterFrom="-translate-x-full opacity-0"
                                enterTo="translate-x-0 opacity-100"
                                leave="transition-all duration-300 transform"
                                leaveFrom="translate-x-0 opacity-100"
                                leaveTo="-translate-x-full opacity-0"    
                            >
                                <div>
                                    <QRCode value={link} ref={qrcodeImage} className='qr-code-image h-22' />
                                    <button onClick={downloadQrCode}  className="download-button-qr-code w-full bg-sky-400 font-bold hover:bg-sky-500 py-2 px-2 mt-2 text-white text-lg rounded-lg flex text-center justify-center items-center">
                                        <h1 className="mr-2">Download QR Code</h1>
                                        <h1><HiOutlineDownload className="text-white font-bold"/></h1>
                                    </button>

                                </div>
                                
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default Section