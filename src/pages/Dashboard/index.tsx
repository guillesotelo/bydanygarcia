import React, { useState } from 'react'
import MagisHogarLogo from '../../assets/logos/logo.png'
import UserIcon from '../../assets/icons/user-icon.svg'

import InvestIcon from '../../assets/icons/invest-icon.svg'
import ExploreIcon from '../../assets/icons/explore-icon.svg'
import SellIcon from '../../assets/icons/sell-icon.svg'
import OptionsIcon from '../../assets/icons/options-icon.svg'
import HelpIcon from '../../assets/icons/help-icon.svg'
import LogoutIcon from '../../assets/icons/logout-icon.svg'


type Props = {}

export default function Dashboard({ }: Props) {
    const [module, setModule] = useState('')
    return (
        <div className="dashboard__container">
            <div className="header__container">
                <img src={MagisHogarLogo} alt="" className="header__logo" />
                <img src={UserIcon} alt="" className="header__account" />
            </div>
            <div className="dashboard__row">

                <div className="sidebar__container">
                    <div className={`sidebar__item ${module === 'inversiones' ? '--selected' : ''} `} onClick={() => setModule('inversiones')}>
                        <img src={InvestIcon} alt="" className="sidebar__svg" />
                        <h4 className="sidebar__module-text">Mis Inveriones</h4>
                    </div>
                    <div className={`sidebar__item ${module === 'explorar' ? '--selected' : ''} `} onClick={() => setModule('explorar')}>
                        <img src={ExploreIcon} alt="" className="sidebar__svg" />
                        <h4 className="sidebar__module-text">Explorar</h4>
                    </div>
                    <div className={`sidebar__item ${module === 'vender' ? '--selected' : ''} `} onClick={() => setModule('vender')}>
                        <img src={SellIcon} alt="" className="sidebar__svg" />
                        <h4 className="sidebar__module-text">Vender</h4>
                    </div>
                    <div className="sidebar__separator"></div>
                    <div className={`sidebar__item ${module === 'opciones' ? '--selected' : ''} `} onClick={() => setModule('opciones')} style={{ marginTop: '.5vw' }}>
                        <img src={OptionsIcon} alt="" className="sidebar__svg" />
                        <h4 className="sidebar__module-text">Opciones</h4>
                    </div>
                    <div className={`sidebar__item ${module === 'ayuda' ? '--selected' : ''} `} onClick={() => setModule('ayuda')}>
                        <img src={HelpIcon} alt="" className="sidebar__svg" />
                        <h4 className="sidebar__module-text">Centro de Ayuda</h4>
                    </div>
                    <div className={`sidebar__item ${module === 'logout' ? '--selected' : ''} `} onClick={() => setModule('logout')}>
                        <img src={LogoutIcon} alt="" className="sidebar__svg" />
                        <h4 className="sidebar__module-text">Cerrar Sesión</h4>
                    </div>
                </div>

                <div className="dashboard__home">
                    <div className="investments__container">
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop1.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Terreno en venta en zona residencial</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop2.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Casa moderna y amplia con jardín</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop3.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Departamento amueblado en renta</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop4.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Terreno con vista panorámica al mar</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop5.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Casa con alberca y vista a la montaña</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop6.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Departamento con terraza en zona céntrica</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop7.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Terreno en esquina con todos los servicios</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop8.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Casa con diseño exclusivo y acabados de lujo</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop9.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Departamento en renta con seguridad 24/7</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop1.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Terreno en venta en zona comercial</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop2.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Casa con amplio jardín y cochera para dos autos</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop3.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Departamento amueblado con excelente ubicación</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop4.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Terreno con uso de suelo mixto</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop5.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Terreno en venta en zona residencial</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop6.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Casa moderna y amplia con jardín</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop7.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Departamento amueblado en renta</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop8.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Terreno con vista panorámica al mar</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop9.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Casa con alberca y vista a la montaña</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop1.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Departamento con terraza en zona céntrica</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop2.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Terreno en esquina con todos los servicios</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop3.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Casa con diseño exclusivo y acabados de lujo</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop4.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Departamento en renta con seguridad 24/7</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop5.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Terreno en venta en zona comercial</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop6.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Casa con amplio jardín y cochera para dos autos</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop7.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Departamento amueblado con excelente ubicación</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                        <div className="publication__card">
                            <div className="publication__image-container">
                                <img src="images/prop8.jpeg" alt="Imagen de propiedad" className="publication__image" />
                            </div>
                            <h4 className="publication__title">Terreno con uso de suelo mixto</h4>
                            <div className="publication__btns">
                                <a className="a btn-solid-sm" href="">Invertir</a>
                                <a href="" className="btn-outline-reg" style={{ padding: '1rem 1.5rem' }}>Ver más</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}