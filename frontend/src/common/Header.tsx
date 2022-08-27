function Header(props: any) {

  return (
    <h1 className="text-3xl font-bold text-gray-900 mb-2">
      {props.title}
    </h1>
  )
}

export default Header;