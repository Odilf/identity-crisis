text = read("questions/main.txt", String)

function process(text::AbstractString)
	questions = map(question -> begin
		question, ends = split(question, "\n")
		left, right = split(ends, " / ")

		[question, left, right]
	end, split(text, "\n\n"))

	questions = map(question -> begin
		question, left, right = question

		"\"$question\",\"$left\",\"$right\""
	end, questions)

	questions = join(questions, "\n")

	"prompt,left_text,right_text\n$questions"
end

process(text) |> clipboard
