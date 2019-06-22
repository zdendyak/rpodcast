import gql from 'graphql-tag'

export const LOGIN_QUERY = gql`
  mutation LoginUser($input: LoginUser!) {
    user: loginUser(input: $input) {
      id
      token
    }
  }
`

export const REQISTER_QUERY = gql`
  mutation RegisterUser($input: NewUser!) {
    user: createUser(input: $input) {
      id
      token
    }
  }
`

export const ALL_RPODS = gql`
  query Rpods {
    rpodList: Rpods {
      id
      title
      description
      text
      audio
      imageUrl
      user {
        name
      }
    }
  }
`

export const GET_RPOD_BY_ID = gql`
  query Rpod ($id: ID!) {
    rpod: Rpod (id: $id) {
      id
      title
      description
      text
      audio
      imageUrl
      user {
        id
        name
      }
    }
  }
`

export const USER_RPODS = gql`
  query UserRpods {
    userRpods: Rpods {
      id
      title
      description
      text
      audio
      imageUrl
      user {
        name
      }
    }
  }
`

export const GET_USER_QUERY = gql`
  query me {
    user: me {
      name
      email
      rpods {
        id
        title
        description
        text
        audio
        imageUrl
      }
    }
  }
`

export const GET_SIGNED_URL_QUERY = gql`
  query AwsUrl ($input: FileData!) {
    aws_url: AwsUrl(input: $input) {
      url
      key
    }
  }
`

export const CREATE_NEW_RPOD_QUERY = gql`
  mutation CreateRpod($input: NewRpod!) {
    rpod: createRpod(input: $input) {
      id
    }
  }
`

export const UPDATE_RPOD_QUERY = gql`
  mutation UpdateRpod($input: UpdateRpod!) {
    rpod: updateRpod(input: $input) {
      id
    }
  }
`

export const DELETE_RPOD_QUERY = gql`
  mutation DeleteRpod($id: ID!) {
    rpod: deleteRpod(id: $id) {
      id
    }
  }
`
