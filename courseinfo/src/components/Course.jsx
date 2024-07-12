const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  console.log(parts)
  const sum = parts.reduce((s, p) => ({exercises: s.exercises + p.exercises}))
  console.log(sum)
  return(
    <p><b>Total of {sum.exercises} exercises</b></p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  console.log(parts)
  return(
    parts.map(part => <Part key={part.id} part={part} />)
  )
}

const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course