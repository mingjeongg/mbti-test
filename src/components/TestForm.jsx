import React, { useState } from "react";
import { questions } from "../data/questions";

const TestForm = ({ onSubmit }) => {
  // 배열의 길이만큼 null로 채우겠다  ex)[null, null, null, ~]
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleChange = (index, answer) => {
    //answers 자체를 수정하는 것이 아니라, 새로운 배열을 복사해서 새로운 배열을 만들어준 다음에, 그 새로운 배열을 가공해서 set을 해준다
    const newAnswers = [...answers];
    //아래처럼 처리하면 newAnwers의 index번째에 answer이 들어감
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 위에서 예 or 아니도 대답으로 만들어낸 새로운 배열을 onSubmit의 인자로 넘겨줌, 그럼 onSubmit으로 가보자, 이름 자체가 submit이니까 제출하는 버튼이 있는 test page에 있겠지
    onSubmit(answers);
  };
  console.log(answers);
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-100 rounded shadow-md"
    >
      {questions.map((q, index) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold">{q.question}</p>
          {/* options의 예/아니오를 map 돌림 => option은 예 or 아니오 */}
          {q.options.map((option, i) => (
            <label key={i} className="block">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option} //raido 쓸 때 이렇게 처리해주면 중복체크가 안됨
                onChange={() => handleChange(index, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        제출하기
      </button>
    </form>
  );
};

export default TestForm;
