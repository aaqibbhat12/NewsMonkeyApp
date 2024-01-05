import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=fa479777ffe4424ca37e1551b421080e&page=1&pagesize=20";
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }
    handleNextclick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
            return;
        }
        else {
            let url = ` https://newsapi.org/v2/everything?domains=wsj.com&apiKey=fa479777ffe4424ca37e1551b421080e&page=${this.state.page + 1}&pagesize=20`;
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles

            })
        }

    }
    handlePrevclick = async () => {
        let url = ` https://newsapi.org/v2/everything?domains=wsj.com&apiKey=fa479777ffe4424ca37e1551b421080e&page=${this.state.page - 1}&pagesize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles

        })
    }
    render() {

        return (
            <div className="container my-3" >
                <h2>NewsMonkey Top Headlines...</h2>
                <div className="row">
                    {this.state.articles && this.state.articles.map((element) => {
                        return <div className="col-md-4">
                            <NewsItem title={element && element.title ? element.title.slice(0, 45) : ""} description={element && element.description ? element.description.slice(0, 88) : ""}
                                imgUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>&larr;Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
