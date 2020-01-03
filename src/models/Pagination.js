class Pagination {
  constructor(
    total = 0,
    current_page =  0,
    per_page = 0,
    last_page = 0,
    from = 0,
    to = 0
  ){
    this.total = total;
    this.current_page = current_page;
    this.per_page = per_page;
    this.last_page = last_page;
    this.from = from;
    this.to = to;
  }
}

export default Pagination;
