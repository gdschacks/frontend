export default function Navbar() {
  return (
    <nav class="bg-customblue p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div>
          <a href={`/`} class="text-black font-bold text-lg">
            <img src="" />
            Quack Prep
          </a>
        </div>
        <div>
          <ul class="flex space-x-10">
            <li>
              <a href={`/`} class="text-black">
                Home
              </a>
            </li>
            <li>
              <a href={`/customquestions`} class="text-black ">
                Custom Questions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
