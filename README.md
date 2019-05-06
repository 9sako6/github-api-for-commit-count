# github-api-for-commit-count
Web API to get a total commit count of a GitHub repository.
[Link](http://secure-tundra-40881.herokuapp.com/)

## Usage

`http://secure-tundra-40881.herokuapp.com/count?user=[username]&repo=[repository]`

e.g.:

```shell
$ curl "http://secure-tundra-40881.herokuapp.com/count?user=vim&repo=vim"
9790
```