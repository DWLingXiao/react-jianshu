import React from 'react'
import { connect } from 'react-redux'
import './topic.css'

function Topic(props) {
    const { list } = props

    return (
        <div className='topicWrapper'>
            {
                list.map((item) => (
                    <div className='topicItem' key={item.get('id')}>
                        <img alt='' className='topic-img' src={item.get('imgUrl')}></img>
                        {item.get('title')}
                    </div>
                )
                )
            }

        </div>
    )
}

const mapStateToProps = (state) => ({
    list: state.getIn(['home', 'topicList'])
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Topic)