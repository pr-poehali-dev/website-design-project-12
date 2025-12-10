import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

type MachineStatus = 'working' | 'idle' | 'maintenance';
type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'archived';

interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  currentTask: string | null;
  progress: number;
}

interface Task {
  id: string;
  orderId: string;
  material: string;
  thickness: number;
  color: string;
  status: TaskStatus;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

interface Material {
  id: string;
  name: string;
  dimensions: string;
  quantity: number;
  unit: string;
  batch: string;
  location: string;
}

const Index = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'task' | 'warehouse'>('dashboard');
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);

  const machines: Machine[] = [
    { id: 'CNC-01', name: 'Раскройный станок #1', status: 'working', currentTask: 'ЗДН-12345', progress: 73 },
    { id: 'CNC-02', name: 'Раскройный станок #2', status: 'working', currentTask: 'ЗДН-12346', progress: 45 },
    { id: 'CNC-03', name: 'Раскройный станок #3', status: 'idle', currentTask: null, progress: 0 },
    { id: 'CNC-04', name: 'Раскройный станок #4', status: 'maintenance', currentTask: null, progress: 0 },
    { id: 'EDGE-01', name: 'Кромкооблицовочный #1', status: 'working', currentTask: 'ЗДН-12347', progress: 90 },
    { id: 'EDGE-02', name: 'Кромкооблицовочный #2', status: 'idle', currentTask: null, progress: 0 },
  ];

  const tasks: Task[] = [
    { id: 'ЗДН-12345', orderId: 'ЗКЗ-5678', material: 'ЛДСП Egger', thickness: 18, color: 'Дуб Сонома', status: 'in_progress', priority: 'high', deadline: '2025-12-15' },
    { id: 'ЗДН-12346', orderId: 'ЗКЗ-5679', material: 'ЛДСП Kronospan', thickness: 16, color: 'Белый', status: 'in_progress', priority: 'medium', deadline: '2025-12-16' },
    { id: 'ЗДН-12347', orderId: 'ЗКЗ-5680', material: 'МДФ Premium', thickness: 22, color: 'Серый Графит', status: 'in_progress', priority: 'high', deadline: '2025-12-15' },
    { id: 'ЗДН-12348', orderId: 'ЗКЗ-5681', material: 'ЛДСП Egger', thickness: 18, color: 'Венге', status: 'pending', priority: 'low', deadline: '2025-12-18' },
  ];

  const materials: Material[] = [
    { id: 'MAT-001', name: 'ЛДСП Egger 2800x2070x18', dimensions: '2800×2070×18мм', quantity: 47, unit: 'листов', batch: 'П-2025-1205', location: 'А-12' },
    { id: 'MAT-002', name: 'ЛДСП Kronospan 2800x2070x16', dimensions: '2800×2070×16мм', quantity: 32, unit: 'листов', batch: 'П-2025-1203', location: 'А-15' },
    { id: 'MAT-003', name: 'МДФ Premium 2800x2070x22', dimensions: '2800×2070×22мм', quantity: 18, unit: 'листов', batch: 'П-2025-1201', location: 'Б-03' },
    { id: 'MAT-004', name: 'ДСП Standart 2750x1830x16', dimensions: '2750×1830×16мм', quantity: 64, unit: 'листов', batch: 'П-2025-1207', location: 'А-08' },
  ];

  const getStatusColor = (status: MachineStatus) => {
    switch (status) {
      case 'working': return 'status-active';
      case 'idle': return 'status-idle';
      case 'maintenance': return 'status-error';
    }
  };

  const getStatusIcon = (status: MachineStatus) => {
    switch (status) {
      case 'working': return 'Play';
      case 'idle': return 'Pause';
      case 'maintenance': return 'AlertTriangle';
    }
  };

  const getStatusText = (status: MachineStatus) => {
    switch (status) {
      case 'working': return 'Работает';
      case 'idle': return 'Простой';
      case 'maintenance': return 'Ремонт';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background grid-industrial">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon name="Factory" className="text-primary" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">AutoPlast</h1>
                  <p className="text-sm text-muted-foreground font-mono"></p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm font-mono text-foreground">Смена #247</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-sm font-mono text-foreground">Иванов А.П.</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm font-mono text-foreground">{new Date().toLocaleTimeString('ru-RU')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b border-border bg-card/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1">
            <Button
              variant={activeView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveView('dashboard')}
              className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
              data-active={activeView === 'dashboard'}
            >
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Рабочий стол
            </Button>
            <Button
              variant={activeView === 'task' ? 'default' : 'ghost'}
              onClick={() => setActiveView('task')}
              className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
              data-active={activeView === 'task'}
            >
              <Icon name="FileText" size={16} className="mr-2" />
              Задания на раскрой
            </Button>
            <Button
              variant={activeView === 'warehouse' ? 'default' : 'ghost'}
              onClick={() => setActiveView('warehouse')}
              className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
              data-active={activeView === 'warehouse'}
            >
              <Icon name="Package" size={16} className="mr-2" />
              Склад материалов
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {activeView === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Оперативный контроль</h2>
                <p className="text-muted-foreground mt-1">Состояние оборудования в реальном времени</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Icon name="Bell" size={16} className="mr-2" />
                  Уведомления
                  <Badge className="ml-2 bg-accent text-accent-foreground">3</Badge>
                </Button>
                <Button size="sm">
                  <Icon name="PlusCircle" size={16} className="mr-2" />
                  Новое задание
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {machines.map((machine) => (
                <Card key={machine.id} className={`border-2 transition-all hover:shadow-lg ${getStatusColor(machine.status)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-lg bg-secondary/50 flex items-center justify-center ${machine.status === 'working' ? 'animate-pulse-status' : ''}`}>
                          <Icon name={getStatusIcon(machine.status)} size={24} />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-mono">{machine.id}</CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">{machine.name}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Статус:</span>
                      <Badge variant="outline" className={getStatusColor(machine.status)}>
                        {getStatusText(machine.status)}
                      </Badge>
                    </div>
                    
                    {machine.currentTask && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Задание:</span>
                          <span className="text-sm font-mono font-semibold">{machine.currentTask}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Прогресс:</span>
                            <span className="text-sm font-mono font-semibold">{machine.progress}%</span>
                          </div>
                          <Progress value={machine.progress} className="h-2" />
                        </div>
                      </>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Icon name="Play" size={14} className="mr-1" />
                        Старт
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Icon name="Pause" size={14} className="mr-1" />
                        Стоп
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Settings" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertCircle" size={20} className="text-accent" />
                  Приоритетные задания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.filter(t => t.priority === 'high').map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Badge className={getPriorityColor(task.priority)}>
                          Высокий
                        </Badge>
                        <div>
                          <p className="font-mono font-semibold">{task.id}</p>
                          <p className="text-sm text-muted-foreground">{task.material} • {task.thickness}мм • {task.color}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Срок сдачи:</p>
                          <p className="text-sm font-mono font-semibold">{task.deadline}</p>
                        </div>
                        <Button size="sm">
                          <Icon name="ArrowRight" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'task' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Задание на раскрой</h2>
                <p className="text-muted-foreground mt-1">Детализация технологического задания</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Icon name="Printer" size={16} className="mr-2" />
                  Печать маршрутного листа
                </Button>
                <Button>
                  <Icon name="CheckCircle" size={16} className="mr-2" />
                  Утвердить
                </Button>
              </div>
            </div>

            <Card className="border-2">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-2xl font-mono">ЗДН-12345</CardTitle>
                      <Badge className="status-active">В работе</Badge>
                      <Badge className={getPriorityColor('high')}>Высокий приоритет</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Создано: 10.12.2025 14:30 • Иванов А.П.</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <Tabs defaultValue="main" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="main">Основное</TabsTrigger>
                    <TabsTrigger value="technology">Технология</TabsTrigger>
                    <TabsTrigger value="execution">Исполнение</TabsTrigger>
                    <TabsTrigger value="result">Результат</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="main" className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Заказ клиента</label>
                          <p className="text-lg font-mono font-semibold mt-1">ЗКЗ-5678</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Материал</label>
                          <p className="text-lg font-semibold mt-1">ЛДСП Egger</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Толщина</label>
                            <p className="text-lg font-mono font-semibold mt-1">18 мм</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Цвет</label>
                            <p className="text-lg font-semibold mt-1">Дуб Сонома</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Норма расхода</label>
                          <p className="text-lg font-mono font-semibold mt-1">12.5 м²</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Дата сдачи</label>
                          <p className="text-lg font-mono font-semibold mt-1">15.12.2025</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Статус выполнения</label>
                          <div className="mt-2">
                            <Progress value={73} className="h-3" />
                            <p className="text-sm font-mono text-muted-foreground mt-1">73% завершено</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="technology" className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Карта раскроя</label>
                          <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 bg-secondary/20 flex items-center justify-center">
                            <div className="text-center">
                              <Icon name="FileImage" size={48} className="mx-auto text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">КР-2025-1205-047.pdf</p>
                              <Button variant="link" className="mt-2">
                                <Icon name="Eye" size={14} className="mr-1" />
                                Просмотр
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Станок</label>
                          <p className="text-lg font-mono font-semibold mt-1">CNC-01 • Раскройный станок #1</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Норма времени</label>
                          <p className="text-lg font-mono font-semibold mt-1">2.5 часа</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Инструмент</label>
                          <p className="text-lg font-semibold mt-1">Пила дисковая D350</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="execution" className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-mono">Партия</TableHead>
                          <TableHead>Оператор</TableHead>
                          <TableHead>Начало</TableHead>
                          <TableHead>Окончание</TableHead>
                          <TableHead className="text-right">Количество</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-mono font-semibold">ПРТ-001</TableCell>
                          <TableCell>Петров С.И.</TableCell>
                          <TableCell className="font-mono">10.12.2025 08:00</TableCell>
                          <TableCell className="font-mono">10.12.2025 10:30</TableCell>
                          <TableCell className="text-right font-mono">47 шт</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono font-semibold">ПРТ-002</TableCell>
                          <TableCell>Сидоров В.К.</TableCell>
                          <TableCell className="font-mono">10.12.2025 10:45</TableCell>
                          <TableCell className="text-muted-foreground">В процессе</TableCell>
                          <TableCell className="text-right font-mono text-muted-foreground">—</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="result" className="space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                      <Card className="border-2 border-success/50 bg-success/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-muted-foreground">Выход годных</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-mono font-bold text-success">47 шт</p>
                          <p className="text-sm text-muted-foreground mt-1">93% от плана</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-destructive/50 bg-destructive/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-muted-foreground">Брак</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-mono font-bold text-destructive">3 шт</p>
                          <p className="text-sm text-muted-foreground mt-1">6% от партии</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-primary/50 bg-primary/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-muted-foreground">КПЭ</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-mono font-bold text-primary">87%</p>
                          <p className="text-sm text-muted-foreground mt-1">Использование материала</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Дефекты и причины брака</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Дефект</TableHead>
                            <TableHead>Количество</TableHead>
                            <TableHead>Причина</TableHead>
                            <TableHead>Ответственный</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-semibold">Скол кромки</TableCell>
                            <TableCell className="font-mono">2 шт</TableCell>
                            <TableCell>Затупление инструмента</TableCell>
                            <TableCell>Петров С.И.</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">Неточный размер</TableCell>
                            <TableCell className="font-mono">1 шт</TableCell>
                            <TableCell>Смещение заготовки</TableCell>
                            <TableCell>Петров С.И.</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'warehouse' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Склад листового пластика</h2>
                <p className="text-muted-foreground mt-1">Учет остатков сырья</p>
              </div>
              <Button>
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт отчета
              </Button>
            </div>

            <Card className="border-2">
              <CardHeader className="border-b border-border">
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Тип материала</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Все типы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все типы</SelectItem>
                        <SelectItem value="ldsp">ЛДСП</SelectItem>
                        <SelectItem value="mdf">МДФ</SelectItem>
                        <SelectItem value="dsp">ДСП</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Толщина</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Все" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="16">16 мм</SelectItem>
                        <SelectItem value="18">18 мм</SelectItem>
                        <SelectItem value="22">22 мм</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Поставщик</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Все" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="egger">Egger</SelectItem>
                        <SelectItem value="kronospan">Kronospan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Поиск</label>
                    <Input placeholder="Артикул, партия..." />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-mono">Артикул</TableHead>
                      <TableHead>Наименование</TableHead>
                      <TableHead>Размеры</TableHead>
                      <TableHead className="text-right">Количество</TableHead>
                      <TableHead className="font-mono">Партия</TableHead>
                      <TableHead>Ячейка</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map((material) => (
                      <TableRow key={material.id} className="hover:bg-secondary/30 transition-colors">
                        <TableCell className="font-mono font-semibold">{material.id}</TableCell>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{material.dimensions}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="font-mono font-bold">{material.quantity}</span>
                            <span className="text-sm text-muted-foreground">{material.unit}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">{material.batch}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {material.location}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline">
                              <Icon name="Minus" size={14} className="mr-1" />
                              Списать
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Icon name="MoreVertical" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-4 gap-4">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Всего материалов</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-mono font-bold">161</p>
                  <p className="text-sm text-muted-foreground mt-1">листов</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Общая площадь</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-mono font-bold">934</p>
                  <p className="text-sm text-muted-foreground mt-1">м²</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-accent/50 bg-accent/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Требуется заказ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-mono font-bold text-accent">2</p>
                  <p className="text-sm text-muted-foreground mt-1">позиции</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Поставщиков</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-mono font-bold">3</p>
                  <p className="text-sm text-muted-foreground mt-1">активных</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;