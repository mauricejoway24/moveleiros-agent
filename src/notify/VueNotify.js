import salert from 'sweetalert2'

class VueNotify {
  swal (props) {
    return salert(props)
  }

  $swal () {
    return salert
  }

  close () {
    salert.close()
  }
}

export default new VueNotify()
