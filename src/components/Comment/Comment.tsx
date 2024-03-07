import { commentType, onChangeEventType } from '../../types'
import User from '../../assets/icons/user-icon.svg'
import Dany from '../../assets/images/dany-comment-profile.png'
import Like from '../../assets/icons/like.svg'
import LikeFilled from '../../assets/icons/like-filled.svg'
import Reply from '../../assets/icons/reply.svg'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'
import { createComment, deleteComment, getRepliesById, updateComment } from '../../services'
import Button from '../Button/Button'
import InputField from '../InputField/InputField'
import toast from 'react-hot-toast'
import { sortArray } from '../../helpers'
import ReplyComment from './ReplyComment'
import { useHistory } from 'react-router-dom'

type Props = {
    comment?: commentType
    setReply: (val: boolean) => void
    reply: boolean
}

export default function Comment({ comment, setReply, reply }: Props) {
    const [data, setData] = useState<commentType>({})
    const [liked, setLiked] = useState(false)
    const [openReply, setOpenReply] = useState(false)
    const [likes, setLikes] = useState(comment?.likes || 0)
    const [replies, setReplies] = useState<commentType[]>([])
    const { lang, isLoggedIn } = useContext(AppContext)
    const history = useHistory()

    useEffect(() => {
        getReplies()
    }, [comment])

    const getCommentDate = (comment?: commentType) => {
        if (!comment || !comment.createdAt) return ''
        const now = new Date().getTime()
        const commentDate = new Date(comment?.createdAt || new Date()).getTime()
        const minutesPassed = (now - commentDate) / 60000
        const daysPassed = (now - commentDate) / (60000 * 60 * 24)
        let timePassed
        if (minutesPassed >= 60) {
            if (daysPassed >= 365) {
                const years = (daysPassed / 365).toFixed(0)
                timePassed = `${years} ${lang === 'es' ? 'año' : 'year'}${Number(years) > 1 ? 's' : ''}`
            }
            else if (daysPassed >= 30) {
                const months = (daysPassed / 30).toFixed(0)
                timePassed = `${months} ${lang === 'es' ? 'mes' : 'month'}${Number(months) > 1 ? 's' : ''}`
            }
            else if (daysPassed >= 1) {
                const days = (minutesPassed / 60 / 24).toFixed(0)
                timePassed = `${days} ${lang === 'es' ? 'día' : 'day'}${Number(days) > 1 ? 's' : ''}`
            }
            else {
                const hours = (minutesPassed / 60).toFixed(0)
                timePassed = `${hours}h`
            }
        } else timePassed = `${minutesPassed.toFixed(0)} min${Number(minutesPassed.toFixed(0)) > 1 ? 's' : ''}`
        return lang === 'es' ? `Hace ${timePassed}` : `${timePassed} ago`
    }

    const getReplies = async () => {
        try {
            if (comment && comment._id) {
                const _replies: commentType = await getRepliesById(comment._id)
                if (_replies && Array.isArray(_replies)) setReplies(_replies)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const likeComment = async () => {
        try {
            if (comment) {
                let _likes = likes + (liked ? -1 : 1)
                const updated = await updateComment({ ...comment, likes: _likes })
                if (updated) {
                    setLiked(!liked)
                    setLikes(_likes)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const renderReply = () => {
        setOpenReply(!openReply)
        setReply(!reply)
    }

    const updateData = (key: string, e: onChangeEventType) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const postReply = async () => {
        try {
            const posted = await createComment({
                ...data,
                isDany: isLoggedIn ? true : false,
                replyingTo: comment?._id
            })
            if (posted && posted._id) {
                toast.success(lang === 'es' ? 'Respuesta añadida!' : 'Reply submitted!')
                getReplies()
                setData({})
            }
            else toast.error(lang === 'es' ? 'Error al enviar comentario. Intenta nuevamente.' : 'Error while sending comment. Please try again.')
        } catch (error) {
            console.error(error)
        }
    }

    const removeComment = async (comment: commentType) => {
        try {
            const deleted = await deleteComment(comment)
            if (deleted) {
                toast.success('Comment deleted')
                setTimeout(() => history.go(0), 1000)
            }
            else toast.error(lang === 'es' ? 'Error al enviar comentario. Intenta nuevamente.' : 'Error while sending comment. Please try again.')
        } catch (error) {
            console.error(error)
        }
    }

    const getProfile = (comment?: commentType) => {
        if (comment && comment.fullname) {
            if (comment.fullname.length > 1) {
                const firstName = comment.fullname.split(' ')[0][0]
                const lastName = comment.fullname.split(' ')[1] ? comment.fullname.split(' ')[1][0] : comment.fullname.split(' ')[0][1]
                return firstName + lastName
            } else return comment.fullname
        }
    }

    return (
        <div className="comment__container">
            <div className="comment__row">
                <div className="comment__col">
                    {comment?.isDany ?
                        <img src={Dany} alt="Comment Profile Image" className="comment__image" />
                        :
                        <p className="comment__profile">{getProfile(comment)}</p>
                    }
                </div>
                <div className="comment__col">
                    <p className="comment__name">{comment?.isDany ? 'Dany' : comment?.fullname ? comment.fullname.split(' ')[0] : ''}</p>
                    <p className="comment__date">{getCommentDate(comment)}</p>
                    <p className="comment__message">{comment?.comment}</p>
                    <div className="comment__btns">
                        <div className="comment__likes">
                            <img src={liked ? LikeFilled : Like} onClick={likeComment} alt="Like this comment" className="comment__likes-img" />
                            {likes ? <p className="comment__likes-count">{likes}</p> : ''}
                        </div>
                        <p className='comment__reply-btn' onClick={renderReply}>{lang === 'es' ? 'Responder' : 'Reply'}</p>
                        {isLoggedIn ? <p className='comment__reply-btn' onClick={() => removeComment(comment || {})} style={{ margin: '0 1rem' }}>Delete</p> : ''}
                    </div>
                </div>
            </div>
            {sortArray(replies, 'createdAt').map((reply, i) => <ReplyComment key={i} comment={reply} />)}
            {openReply ?
                <div className="comment__reply-row" >
                    <div className="comment__col" style={{ width: '15%' }}>
                        <img src={Reply} alt="Reply" className="comment__reply-image" />
                    </div>
                    <div className="comment__col" style={{ width: '80%' }}>
                        <p className="comment__reply-title">{lang === 'es' ? 'Responde a ' : 'Reply to '}{comment?.fullname ? <i>{comment.fullname.split(' ')[0]}</i> : ''}</p>
                        <div className="comment__reply-box">
                            <InputField
                                name='fullname'
                                value={isLoggedIn ? 'Dany' : data.fullname}
                                updateData={updateData}
                                placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                                disabled={isLoggedIn}
                            />
                            {isLoggedIn ? '' :
                                <InputField
                                    name='email'
                                    value={data.email}
                                    updateData={updateData}
                                    placeholder={lang === 'es' ? 'Tu email' : 'Your email'}
                                />}
                            <InputField
                                name='comment'
                                value={data.comment}
                                updateData={updateData}
                                placeholder={lang === 'es' ? 'Tu comentario' : 'Your comment'}
                                type='textarea'
                                rows={8}
                            />
                            <div className="comment__reply-btns">
                                <Button
                                    label={lang === 'es' ? 'Enviar Comentario' : 'Post Comment'}
                                    handleClick={postReply}
                                />
                                <p className='comment__reply-btn' onClick={renderReply}>{lang === 'es' ? 'Cancelar' : 'Cancel'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    )
}