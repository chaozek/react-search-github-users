import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  
  const {githubRepos} = React.useContext(GithubContext)
let languages = githubRepos.reduce((total, item)=>{
  if (!item.language) return total 
  if(!total[item.language]){
    total[item.language] = {label: item.language, value:1, stars:item.stargazers_count}
  }else{
    total[item.language] = {...total[item.language], value:total[item.language].value +1, stars: total[item.language].stars + item.stargazers_count}

  }
  return total
}, {})


const mostUsed = Object.values(languages).sort((a,b) =>{
  return b.value - a.value
}).slice(0,5)
console.log(languages)

const mostPopular = Object.values(languages).sort((a,b) =>{
  return b.stars - a.stars
}).map((item)=>{
return {...item, value:item.stars}
})
console.log(mostPopular)


let {stars, forks} = githubRepos.reduce((total, item)=>{
  const {stargazers_count, name, forks} =item
  total.stars[stargazers_count] = {label:name, value:stargazers_count}
  return total
}, {
  stars:{}, forks:{}
})
stars = Object.values(stars).slice(-5).reverse()

  return (
    <section className="section">
    <Wrapper className="section-center">
    <div>
  <Pie3D data={mostUsed}/>
    </div>
  <Doughnut2D data={mostPopular}/>
  <Column3D data={stars}/>
  <Bar3D data={mostPopular}/>
  </Wrapper>
  </section>  
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
