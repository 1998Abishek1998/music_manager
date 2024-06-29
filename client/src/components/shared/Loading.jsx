import PropTypes from 'prop-types'

const Loading = ({ marginTop }) => {
  const top = marginTop || '45vh'
  return (
    <div className="flex items-center justify-center bg-transparent">
      <div style={{
        marginTop: top,
      }}
        className="bg-none"
      >
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">
            <span className="font-extrabold">.</span>
          </span>
        </div>
      </div>
    </div>
  )
}

Loading.propTypes = {
  marginTop: PropTypes.string,
}

export default Loading
