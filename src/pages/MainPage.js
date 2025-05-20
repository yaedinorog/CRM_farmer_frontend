import TopMenu from "../components/TopMenu";

function MainPage() {
    return (
        <div class='bg-blue-100'>
            <TopMenu />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-5xl font-bold mb-20 mt-20">Добро пожаловать в CRM Фермер</h1>
                <div className='justify-center flex'>
                    <p className="text-gray-700 mb-4 xl:w-1/2">
                        Это приложение поможет вам управлять вашим фермерским бизнесом.
                    </p>
                    <p className='text-gray-700 mb-4'>
                        Вы сможете отслеживать успехи работников, их требования и пожелания, а также вести учет ваших продуктов
                    </p>
                </div>
            </div>
        </div>
    )
}
export default MainPage;