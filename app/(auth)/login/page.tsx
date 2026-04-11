import AppLine from "@/components/AppLine";
import ButtonAuth from "@/components/ButtonAuth";
import AppImage from "@/components/image/AppImage";
import { IMAGE_SOUCE } from "@/public/assets/images";
import { ROUTE } from "@/type/constant/route";
import FormField from "./FormField";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-12 bg-orange-50/30 relative overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Decorative Vibrant Blobs */}
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-amber-200/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-200/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white/80 backdrop-blur-md rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(251,146,60,0.15)] overflow-hidden min-h-[750px] border border-white">
        {/* Left Side: Visual Hero Panel */}
        <div className="hidden md:flex flex-col relative bg-orange-100 overflow-hidden group">
          <AppImage
            src={IMAGE_SOUCE.IMG_BACKGROUD_AUTH}
            alt="Fresh Ingredients"
            classNameContainer="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-3000 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-orange-500/40 via-transparent to-white/20"></div>

          <div className="absolute inset-0 p-12 z-10 h-full flex flex-col justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <span className="text-orange-500 text-3xl font-black">Y</span>
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">
                YumRush
              </span>
            </div>

            {/* Floating Menu Cards - Replaces the old text block */}
            <div className="relative h-[400px] w-full mt-10">
              {/* Card 1: Burger */}
              <div className="absolute top-0 left-0 w-64 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white transform -rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-500">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                    🍔
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Classic Wagyu</h4>
                    <div className="flex text-amber-400 text-xs">★★★★★</div>
                  </div>
                  <div className="ml-auto font-black text-orange-500">
                    $12.9
                  </div>
                </div>
              </div>

              {/* Card 2: Ramen */}
              <div className="absolute top-24 right-0 w-64 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white transform rotate-3 hover:rotate-0 hover:-translate-y-2 transition-all duration-500 delay-75">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-2xl">
                    🍜
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Spicy Tonkotsu</h4>
                    <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                      FAST DELIVERY
                    </span>
                  </div>
                  <div className="ml-auto font-black text-rose-500">$14.5</div>
                </div>
              </div>

              {/* Card 3: Fries */}
              <div className="absolute bottom-12 left-10 w-56 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white transform -rotate-1 hover:rotate-0 hover:-translate-y-2 transition-all duration-500 delay-150">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                    🍟
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      Truffle Fries
                    </h4>
                    <p className="text-[10px] text-slate-400">Popular Side</p>
                  </div>
                  <div className="ml-auto text-orange-500">🔥</div>
                </div>
              </div>
            </div>

            {/* Social Proof Footer */}
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 flex items-center gap-4 text-white">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-orange-400 object-cover"
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    alt="User"
                  />
                ))}
              </div>
              <p className="text-xs font-bold drop-shadow-sm">
                Join <span className="text-amber-300">50,000+</span> hungry
                foodies today!
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Brighter Form */}
        <div className="flex flex-col p-8 md:p-8 lg:p-20 justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            {/* Logo Mobile */}
            <div className="md:hidden flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-white text-xl font-bold">Y</span>
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                YumRush
              </span>
            </div>

            <div className="mb-10">
              <h1 className="text-4xl font-black text-colorBlack mb-3 tracking-tight">
                Chào mừng trở lại!
              </h1>
              <p className="text-colorGray font-medium leading-relaxed">
                Đăng nhập để đặt món yêu thích của bạn chỉ trong vài phút
              </p>
            </div>

            <div className="space-y-3">
              <FormField />

              <div className="flex justify-between items-center gap-2">
                <AppLine />
                <p className="text-md whitespace-nowrap font-medium text-colorOrange">
                  ĐĂNG NHẬP BẰNG
                </p>
                <AppLine />
              </div>

              <ButtonAuth />
              <p className="text-center text-slate-400 text-sm font-medium">
                Bạn chưa có tài khoản?
                <Link
                  href={ROUTE.REGISTER}
                  className="text-blue-400 font-medium text-[17px] transition-all ml-1"
                >
                  Tạo tài khoản
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
