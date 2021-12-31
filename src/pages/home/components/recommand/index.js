import React from 'react'
import { connect } from 'react-redux'
import './recommand.css'
function Recommand(props) {

    const { recommandList } = props
    return (
        <div className='recommandWrapper'>
            {
                recommandList.map((item) => (
                    <div className='recommandItem' key={item.get('id')}>
                        <img className='recommand-img' alt='' src={item.get('imgUrl')} referrerPolicy="no-referrer"></img>
                    </div>
                ))
            }
        </div>
    )
}
const mapStateToProps = (state) => ({
    recommandList: state.getIn(['home', 'recommandList'])
})

export default connect(mapStateToProps)(Recommand)