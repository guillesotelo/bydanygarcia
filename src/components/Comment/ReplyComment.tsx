import { commentType, onChangeEventType } from '../../types'
import User from '../../assets/icons/user-icon.svg'
import Dany from '../../assets/images/dany-comment-profile.png'
import Like from '../../assets/icons/like.svg'
import LikeFilled from '../../assets/icons/like-filled.svg'
import Reply from '../../assets/icons/reply.svg'
import { useContext, useState } from 'react'
import { AppContext } from '../../AppContext'
import { updateComment } from '../../services'

type Props = {
    comment?: commentType
}

export default function ReplyComment({ comment }: Props) {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(comment?.likes || 0)
    const { lang } = useContext(AppContext)

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

    return (
        <div className="comment__row" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid lightgray' }}>
            <div className="comment__col" style={{ width: '10%' }}>
                <img src={Reply} alt="Reply" className="comment__reply-image" />
            </div>
            <div className="comment__col" style={{ width: '10%' }}>
                <img src={comment?.isDany ? Dany : User} alt="Comment Profile Image" className="comment__image" />
            </div>
            <div className="comment__col" style={{ width: '80%' }}>
                <p className="comment__name">{comment?.fullname ? comment.fullname.split(' ')[0] : ''}</p>
                <p className="comment__date">{getCommentDate(comment)}</p>
                <p className="comment__message">{comment?.comment}</p>
                <div className="comment__btns">
                    <div className="comment__likes">
                        <img src={liked ? LikeFilled : Like} onClick={likeComment} alt="Like this comment" className="comment__likes-img" />
                        {likes ? <p className="comment__likes-count">{likes}</p> : ''}
                    </div>
                </div>
            </div>
        </div>

    )
}